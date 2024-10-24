# Blinking Cursor Documentation

The TypingTitle component includes a blinking cursor effect that activates after the typing animation is complete. This effect is achieved using a custom CSS animation defined in the Tailwind configuration.

## How it works

1. The cursor is represented by the `|` character.
2. During typing, the cursor is static.
3. After typing is complete, the cursor starts blinking using the `animate-fast-blink` class.

## Customizing the Blink Effect

The blinking effect is defined in the `tailwind.config.js` file. You can modify its behavior by adjusting the following:

```javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fast-blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      },
      animation: {
        'fast-blink': 'fast-blink 0.5s steps(2, start) infinite',
      }
    },
  },
};
```

### Adjusting Blink Speed

To change the blink speed, modify the duration in the animation definition:

- Faster blink: `'fast-blink': 'fast-blink 0.25s steps(2, start) infinite',`
- Slower blink: `'fast-blink': 'fast-blink 1s steps(2, start) infinite',`

### Changing Blink Style

You can modify the keyframes to change how the cursor blinks:

- Fade effect: 
  ```javascript
  'fast-blink': {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.5' },
  }
  ```
- Color change:
  ```javascript
  'fast-blink': {
    '0%, 100%': { color: 'currentColor' },
    '50%': { color: 'transparent' },
  }
  ```

Remember to rebuild your Tailwind CSS after making changes to the configuration file for the new styles to take effect.

## Usage in TypingTitle Component

The blinking effect is applied in the TypingTitle component like this:

```jsx
<span className={`${isTypingComplete ? 'animate-fast-blink' : ''}`}>
  {isTypingComplete ? '|' : (displayedText.length < fullText.length ? '|' : '')}
</span>
```

You can modify this part to change when or how the blinking effect is applied.