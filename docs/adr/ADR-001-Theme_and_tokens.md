# ADR-001: Theme and tokens

## Date

2023-10-04

## Status

ACCEPTED

## Context

At the moment, when providing custom themes to the Design System, the user can only override the palette of colors.
In some cases, this can be limiting, as the user may need to override specific parts of components to respect A11Y
guidelines or to have more coherent colors.

## Decision

We will change the structure of the Theme object provided to the Design System to allow providing overrides for either
the palette, alias or component tokens.
- Any change in the palette will be reflected in the component tokens.
- Any change in the alias tokens will be reflected in the component tokens.
- Alias tokens will accept either color tokens from the palette or other alias tokens.
- Component tokens will accept either color tokens from the palette or alias tokens.
- At the moment, only colors can be overridden, but this could be extended to other tokens in the future.

The input structure accepted by the `DesignSystem` provider would be as follows:

```typescript
interface Palette {
    color-brand-<tint>: string; // e.g: color-brand-05: #E0F0F9
    color-accent-<tint>: string;
    color-neutral-<tint>: string;
    color-alert-<tint>: string;
    color-informative-<tint>: string;
    color-success-<tint>: string;
    color-warning-<tint>: string;
    ...
}

type RefTokensCustomization = Palette; // For now, only Palette would be customizable

interface AliasTokens {
    // This to be determined, but would be something like
    button-color-secondary: keyof AliasTokens | keyof RefTokens;
    interaction-color: keyof AliasTokens | keyof RefTokens;
};

interface ComponentTokens {
    <component>-<flavor?>-<property>: keyof AliasTokens | keyof RefTokens;
    button-primary-background-color: 'color-brand-05';
    ...
};

interface ThemeCustomization {
    ref: RefTokensCustomization;
    alias: AliasTokens; // We might need a AliasTokensCustomization layer to prevent overriding certain alias 
    component: ComponentTokens;
}
```

The output structure exposed by the `useTheme` hook and the `ThemeProvider` would be as follows:

```typescript
type RefTokens = Palette; // For now, only Palette is exposed

interface Theme {
    ref: RefTokens;
    alias: AliasTokens;
    component: ComponentTokens;
}
```

The `ref` section is inspired
by [Material Design Reference tokens](https://m3.material.io/foundations/design-tokens/how-to-read-tokens#bc81aaf5-fcd8-421b-a5ab-4b1f274c1baf).
We could in the future move CSS variables in this section and redefine some types.

```typescript
interface TextAttributes {
    'font-weight-bold': string;
}

type RefTokens = Palette & TextAttributes;
```

The implementation needs to support providing only partial overrides of the palette, alias and/or component tokens.
This means that any unknown (e.g. passing a key that doesn't exist in the palette definition) or missing value
in the customization object will be replaced by the default's Equisoft value.

The computed Theme object will have final values for component tokens.
As an example, if the component token was defined as `button-primary-background-color: 'color-brand-05'`,
the value of `button-primary-background-color` would be the color HEX value from `color-brand-05`.

## Consequences

### Positive

- This will allow users to customize the Design System in a more granular way.
- This will allow us to have a more common language with the design team.

### Negative

- This is a breaking change as the input of the Design System and what is available through the `ThemeProvider` changes.
- Before implementing and releasing this change, we need to be sure we have all the required values for the different
  theme customizations we have in our products.


## Appendix

https://m3.material.io/foundations/design-tokens
https://spectrum.adobe.com/page/design-tokens/
https://carbondesignsystem.com/guidelines/color/overview/
