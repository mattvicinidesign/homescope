#!/usr/bin/env node

/**
 * Token Compliance Guardrail Script
 * 
 * Checks for violations of token-driven design system rules:
 * - Tailwind arbitrary values ([...] in className)
 * - Hard-coded visual values outside tokens.css
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const ROOT_DIR = process.cwd();
const SRC_DIR = join(ROOT_DIR, 'src');
const TOKENS_FILE = join(SRC_DIR, 'tokens.css');

const IGNORE_DIRS = ['node_modules', 'dist', '.git'];
const IGNORE_FILES = ['App.css']; // Unused template files
const ALLOWED_FILES_FOR_LITERALS = ['tokens.css'];
const ALLOWED_EXTENSIONS_FOR_LITERALS = ['.md'];

let violations = [];
let filesChecked = 0;

function shouldIgnorePath(filePath) {
  const parts = filePath.split(/[/\\]/);
  const fileName = parts[parts.length - 1];
  
  if (IGNORE_FILES.includes(fileName)) {
    return true;
  }
  
  return IGNORE_DIRS.some(dir => parts.includes(dir));
}

function isAllowedFileForLiterals(filePath) {
  const fileName = filePath.split(/[/\\]/).pop();
  const ext = fileName.substring(fileName.lastIndexOf('.'));
  
  return ALLOWED_FILES_FOR_LITERALS.includes(fileName) ||
         ALLOWED_EXTENSIONS_FOR_LITERALS.includes(ext);
}

function checkTailwindArbitrary(content, filePath) {
  const lines = content.split('\n');
  const classNameRegex = /className=["'`]([^"'`]*)["'`]/g;
  
  lines.forEach((line, lineNum) => {
    let match;
    while ((match = classNameRegex.exec(line)) !== null) {
      const classNameValue = match[1];
      if (classNameValue.includes('[')) {
        violations.push({
          type: 'tailwind-arbitrary',
          file: relative(ROOT_DIR, filePath),
          line: lineNum + 1,
          content: line.trim(),
          message: `Tailwind arbitrary value found: ${match[0]}`,
        });
      }
    }
  });
}

function checkHardCodedValues(content, filePath) {
  if (isAllowedFileForLiterals(filePath)) {
    return; // tokens.css and .md files are allowed
  }
  
  const lines = content.split('\n');
  
  // Patterns to detect
  const patterns = [
    {
      regex: /#[0-9a-fA-F]{3,6}\b/g,
      type: 'hex-color',
      description: 'hex color',
    },
    {
      regex: /rgb\(/gi,
      type: 'rgb-color',
      description: 'rgb() color',
    },
    {
      regex: /rgba\(/gi,
      type: 'rgba-color',
      description: 'rgba() color',
    },
    {
      regex: /hsl\(/gi,
      type: 'hsl-color',
      description: 'hsl() color',
    },
    {
      regex: /hsla\(/gi,
      type: 'hsla-color',
      description: 'hsla() color',
    },
    {
      // Match px/rem values but exclude:
      // - CSS variable references (var(--...))
      // - Comments (/* ... */ or //)
      // - Strings that are clearly documentation or examples
      regex: /\b\d+(\.\d+)?(px|rem)\b(?![^;]*var\(|.*\/\*|.*\/\/)/g,
      type: 'hardcoded-unit',
      description: 'hard-coded px/rem value',
    },
  ];
  
  lines.forEach((line, lineNum) => {
    // Skip lines that are clearly in string literals or comments
    const trimmed = line.trim();
    if (trimmed.startsWith('//') || trimmed.startsWith('/*') || trimmed.startsWith('*')) {
      return;
    }
    
    // Skip lines that are just whitespace or only comments
    if (!trimmed || trimmed.startsWith('//')) {
      return;
    }
    
    patterns.forEach(({ regex, type, description }) => {
      const matches = line.match(regex);
      if (matches) {
        // Filter out false positives:
        // - CSS variable definitions in tokens.css (already handled by isAllowedFileForLiterals)
        // - Values inside CSS calc() or var() expressions
        // - Values in comments (basic check)
        const isInVar = line.includes('var(--') || line.includes('calc(');
        const isInComment = line.includes('/*') || line.includes('//');
        const isStringLiteral = (line.match(/["'`]/g) || []).length >= 2;
        
        // If it's in a var() or calc(), it's probably okay (e.g., "calc(var(--space-4) + 2px)" is intentional)
        if (!isInVar && !isInComment && type !== 'hardcoded-unit') {
          violations.push({
            type,
            file: relative(ROOT_DIR, filePath),
            line: lineNum + 1,
            content: line.trim(),
            message: `Hard-coded ${description} found`,
          });
        }
        
        // For px/rem, be more strict - only flag if not in var/calc and not a clearly intentional edge case
        if (type === 'hardcoded-unit' && !isInVar && !isInComment) {
          // Skip if it's in a string literal that's clearly documentation (e.g., value: '8px' in an object)
          // This happens in PlaygroundPage where we display token values
          const isDocumentationValue = line.includes("value:") || line.includes("'") && line.match(/value:\s*['"]\d+px/);
          
          // Skip inline style values in JSX (these should use tokens, but flag them separately)
          const isInlineStyle = line.includes('style={{') || line.includes("style={{");
          
          // Flag inline styles as they should use tokens
          if (isInlineStyle) {
            violations.push({
              type,
              file: relative(ROOT_DIR, filePath),
              line: lineNum + 1,
              content: line.trim(),
              message: `Hard-coded ${description} in inline style (use CSS variables instead)`,
            });
          } else if (!isDocumentationValue) {
            // Flag other hard-coded values
            violations.push({
              type,
              file: relative(ROOT_DIR, filePath),
              line: lineNum + 1,
              content: line.trim(),
              message: `Hard-coded ${description} found`,
            });
          }
        }
      }
    });
  });
}

function scanDirectory(dir) {
  try {
    const entries = readdirSync(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      
      if (shouldIgnorePath(fullPath)) {
        continue;
      }
      
      const stat = statSync(fullPath);
      
      if (stat.isDirectory()) {
        scanDirectory(fullPath);
      } else if (stat.isFile()) {
        const ext = entry.substring(entry.lastIndexOf('.'));
        // Check .ts, .tsx, .js, .jsx, .css files
        if (['.ts', '.tsx', '.js', '.jsx', '.css'].includes(ext)) {
          try {
            const content = readFileSync(fullPath, 'utf-8');
            filesChecked++;
            
            checkTailwindArbitrary(content, fullPath);
            checkHardCodedValues(content, fullPath);
          } catch (err) {
            console.error(`Error reading ${fullPath}: ${err.message}`);
          }
        }
      }
    }
  } catch (err) {
    // Directory might not exist, skip
  }
}

// Main execution
console.log('🔍 Checking token compliance...\n');

// Scan src directory
scanDirectory(SRC_DIR);

// Also check root-level config files
const rootFiles = ['tailwind.config.js', 'postcss.config.js', 'eslint.config.js', 'vite.config.ts'];
rootFiles.forEach(file => {
  const fullPath = join(ROOT_DIR, file);
  try {
    const content = readFileSync(fullPath, 'utf-8');
    filesChecked++;
    checkTailwindArbitrary(content, fullPath);
    checkHardCodedValues(content, fullPath);
  } catch (err) {
    // File might not exist, skip
  }
});

// Report results
if (violations.length === 0) {
  console.log(`✅ Token compliance check passed (${filesChecked} files checked)`);
  process.exit(0);
} else {
  console.error(`❌ Found ${violations.length} violation(s):\n`);
  
  violations.forEach((violation, idx) => {
    console.error(`${idx + 1}. ${violation.type.toUpperCase()}: ${violation.file}:${violation.line}`);
    console.error(`   ${violation.message}`);
    console.error(`   ${violation.content}\n`);
  });
  
  console.error(`\n💡 Fix: Only use tokens from tokens.css. No arbitrary Tailwind values ([...]).`);
  process.exit(1);
}
