import type { ToolPageContent } from '../types';
import { jsonFormatterContent } from './json-formatter';
import { jwtDecoderContent } from './jwt-decoder';
import { regexTesterContent } from './regex-tester';

export const TOOL_CONTENT_OVERRIDES: Partial<Record<string, ToolPageContent>> = {
  'json-formatter': jsonFormatterContent,
  'jwt-decoder': jwtDecoderContent,
  'regex-tester': regexTesterContent,
};
