/**
 * Rsbuild 插件：移除代码中的 console.log
 * @param {Object} options - 插件配置选项
 * @param {boolean} options.removeAll - 是否移除所有 console 方法（默认只移除 log）
 * @param {string[]} options.exclude - 要排除的 console 方法，如 ['error', 'warn']
 * @param {boolean} options.prodOnly - 是否仅在生产环境移除（默认 true）
 */
export const pluginRemoveConsole = (options = {}) => ({
  name: 'plugin-remove-console',

  setup(api) {
    const { removeAll = false, exclude = [], prodOnly = true } = options;

    // 使用 transform 钩子在代码转换阶段移除 console
    api.transform({ test: /\.(js|jsx|ts|tsx)$/ }, ({ code }) => {
      // 如果设置为仅生产环境且当前不是生产环境，则不处理
      if (prodOnly && process.env.NODE_ENV !== 'production') {
        return code;
      }

      // 确定要移除的 console 方法
      let consoleMethods;
      if (removeAll) {
        consoleMethods = ['log', 'info', 'warn', 'error', 'debug', 'trace'].filter(
          method => !exclude.includes(method),
        );
      } else {
        consoleMethods = ['log'];
      }

      // 使用正则表达式移除 console 调用
      let transformedCode = code;

      consoleMethods.forEach(method => {
        // 匹配 console.method(...) 的各种形式
        // 包括单行和多行调用
        const regex = new RegExp(`console\\.${method}\\s*\\([^)]*\\)\\s*;?`, 'g');
        transformedCode = transformedCode.replace(regex, '');

        // 处理多行的复杂调用（带换行符）
        const multilineRegex = new RegExp(`console\\.${method}\\s*\\([\\s\\S]*?\\)\\s*;?`, 'g');
        transformedCode = transformedCode.replace(multilineRegex, match => {
          // 确保匹配的括号是平衡的
          let openParens = 0;
          let closeIndex = -1;
          for (let i = match.indexOf('('); i < match.length; i++) {
            if (match[i] === '(') openParens++;
            if (match[i] === ')') {
              openParens--;
              if (openParens === 0) {
                closeIndex = i;
                break;
              }
            }
          }
          return closeIndex !== -1 ? '' : match;
        });
      });

      return transformedCode;
    });
  },
});
