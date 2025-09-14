// use builder pattern to build query string step by step

import type { KeyLabelItem } from "../store/search-param-store";

class QueryStringBuilder {
  private parts: string[] = [];

  constructor(baseQuery: string = '') {
    if (baseQuery.trim()) {
      this.parts.push(baseQuery.trim());
    }
  }

  addRange(key: string, min?: number, max?: number): this {
    if(!min && !max) {
      return this;
    }
    if (!min && max) {
      const rangeQuery = `${key}:${`<=${max}`}`;
      this.parts.push(rangeQuery);
    }

    if (!max && min) {
      const rangeQuery = `${key}:${`>=${min}`}`;
      this.parts.push(rangeQuery);
    }

    if (min && max) {
      const rangeQuery = `${key}:${min}..${max}`;
      this.parts.push(rangeQuery);
    }
    return this;
  }

  addBoolean(key: string, value: boolean): this {
    if (value!== undefined) {
      this.parts.push(`${key}:${value}`);
    }
    return this;
  }

  build(): string {
    const queryString = this.parts
      .filter(part => part.trim())
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
    return queryString;
  }
}

export const buildQuerySimpler = (initialString: string, keyLabelItems: {[key: string] : KeyLabelItem}): string => {
    const builder = new QueryStringBuilder(initialString);

    ['stars', 'forks'].forEach(key => {
        const item = keyLabelItems[key];
        if (item?.checked && typeof item.values === 'object') {
        builder.addRange(key, item.values.min, item.values.max);
        }
    });

    ['archived', 'mirror', 'template'].forEach(key => {
        const item = keyLabelItems[key];
        if (item?.checked && item.values === true) {
        builder.addBoolean(key, true);
        }
    });

    return builder.build();
};