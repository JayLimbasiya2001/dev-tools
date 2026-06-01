import type { ComponentType, LazyExoticComponent } from 'react';
import type { CategoryId } from '../categories';

export interface ToolDefinition {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  category: CategoryId;
  tags: string[];
  keywords: string[];
  trending?: boolean;
  component: LazyExoticComponent<ComponentType>;
}

export type ToolMeta = Omit<ToolDefinition, 'component'>;
