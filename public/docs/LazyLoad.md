# LazyLoad Component Documentation

## Overview

The `LazyLoad` component is designed to enhance performance by deferring the rendering of content until it becomes visible in the viewport. This is particularly useful for improving initial page load times by only loading images, lists, or other heavy UI elements when they are needed.

## File Location

`boilerplate2\components\LazyLoad.tsx`

## Usage

Wrap any component or element that you want to lazily load with the `LazyLoad` component. The children of `LazyLoad` will only be rendered once the component intersects with the viewport plus a margin of `100px`.

## Example

```tsx
import LazyLoad from './components/LazyLoad';

function App() {
  return (
    <div>
      <h1>Header</h1>
      <LazyLoad>
        <img src="heavy-image.png" alt="Heavy to Load" />
      </LazyLoad>
    </div>
  );
}
```

## Props

- **children** (`ReactNode`): The content that you want to lazy load. This can be any React node (e.g., components, elements).

## How It Works

The `LazyLoad` component uses the `IntersectionObserver` API to detect when the component enters the viewport. Once visible, the content is rendered, and the observer is unregistered for that component instance to prevent re-rendering.

## API Reference

### `LazyLoadProps`

- **children**: `ReactNode`
  - The children passed to `LazyLoad` are not rendered until the component becomes visible within the viewport.

### Import

```tsx
import LazyLoad from 'path_to_components/LazyLoad';
```

## Best Practices

- **Optimization**: Use `LazyLoad` for images, long lists, or any heavy components that are not immediately visible on page load to reduce initial load time.
- **Fallback Content**: Since the children are not rendered until visible, consider using placeholders or skeletons in the parent container to maintain layout stability.

## Notes

- Ensure your environment supports the `IntersectionObserver` API, or include a polyfill for broader compatibility.
- Adjust the `rootMargin` in the IntersectionObserver options according to the needs of your application's layout and design.