export type Translation = {
  title: string;
  copy: string;
  copied: string;
  tabs: {
    basic: string;
    theme: string;
    plugin: string;
  };
  rightTabs: {
    live: string;
    guide: string;
    config: string;
  };
  preview: string;
  basic: {
    general: string;
    enableSyntax: string;
    nocompatible: string;
    mouseMode: string;
    lineNumbers: string;
    relativeNumbers: string;
    cursorLine: string;
    wordWrap: string;
    indentation: string;
    autoIndent: string;
    smartIndent: string;
    expandTab: string;
    tabStop: string;
    shiftWidth: string;
    search: string;
    hlSearch: string;
    incSearch: string;
    ignoreCase: string;
    smartCase: string;
    ui: string;
    showCmd: string;
    showMode: string;
    showMatch: string;
    wildMenu: string;
    files: string;
    backup: string;
    write: string;
    swapFile: string;
    mouseOptions: {
      disabled: string;
      normal: string;
      visual: string;
      insert: string;
      all: string;
    };
  };
  theme: {
    colorScheme: string;
    background: string;
    preview: string;
  };
  plugin: {
    select: string;
    enabled: string;
    disabled: string;
  };
  livePreview: {
    title: string;
  };
  usageGuide?: {
    title: string;
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3?: { title: string; desc: string };
    step4: { title: string; desc: string };
  };
};

export const translations: Record<"en" | "zh", Translation> = {
  en: {
    title: "Vim Config UI",
    copy: "Copy",
    copied: "Copied!",
    tabs: {
      basic: "⚙️ Basic",
      theme: "🎨 Theme",
      plugin: "🔌 Plugin"
    },
    rightTabs: {
      live: "🎯 Live Preview",
      guide: "📖 Usage Guide",
      config: "📄 Config"
    },
    preview: "📄 Configuration Preview",
    basic: {
      general: "General",
      enableSyntax: "Enable syntax",
      nocompatible: "Set nocompatible",
      mouseMode: "Mouse Mode",
      lineNumbers: "Line Numbers",
      relativeNumbers: "Relative Numbers",
      cursorLine: "Cursor Line",
      wordWrap: "Word Wrap",
      indentation: "Indentation",
      autoIndent: "Auto Indent",
      smartIndent: "Smart Indent",
      expandTab: "Expand Tab",
      tabStop: "Tab Stop",
      shiftWidth: "Shift Width",
      search: "Search",
      hlSearch: "Highlight Search",
      incSearch: "Incremental Search",
      ignoreCase: "Ignore Case",
      smartCase: "Smart Case",
      ui: "UI",
      showCmd: "Show Command",
      showMode: "Show Mode",
      showMatch: "Show Match",
      wildMenu: "Wild Menu",
      files: "Files",
      backup: "Backup",
      write: "Write",
      swapFile: "Swap File",
      mouseOptions: {
        disabled: "Disabled",
        normal: "Normal",
        visual: "Visual",
        insert: "Insert",
        all: "All"
      }
    },
    theme: {
      colorScheme: "Color Scheme",
      background: "Background",
      preview: "Color Preview"
    },
    plugin: {
      select: "Select plugins for your configuration.",
      enabled: "Enabled",
      disabled: "plugins"
    },
    livePreview: {
      title: "🎯 Live Preview"
    },
    usageGuide: {
      title: "How to Use",
      step1: {
        title: "Install vim-plug",
        desc: "Run this command in your terminal:"
      },
      step2: {
        title: "Copy Configuration",
        desc: "Go to 'Config' tab, click on the configuration content to copy it, then paste into ~/.vimrc file"
      },
      step3: {
        title: "Install Plugins",
        desc: "Open Vim and run:"
      },
      step4: {
        title: "Restart Vim",
        desc: "Close and reopen Vim to apply all settings."
      }
    }
  },
  zh: {
    title: "Vim 配置工具",
    copy: "复制配置",
    copied: "已复制！",
    tabs: {
      basic: "⚙️ 基础",
      theme: "🎨 主题",
      plugin: "🔌 插件"
    },
    rightTabs: {
      live: "🎯 实时预览",
      guide: "📖 使用指南",
      config: "📄 配置"
    },
    preview: "📄 配置预览",
    basic: {
      general: "常规",
      enableSyntax: "启用语法高亮",
      nocompatible: "兼容模式",
      mouseMode: "鼠标模式",
      lineNumbers: "行号",
      relativeNumbers: "相对行号",
      cursorLine: "光标行",
      wordWrap: "自动换行",
      indentation: "缩进",
      autoIndent: "自动缩进",
      smartIndent: "智能缩进",
      expandTab: "Tab 转空格",
      tabStop: "Tab 宽度",
      shiftWidth: "缩进宽度",
      search: "搜索",
      hlSearch: "高亮搜索",
      incSearch: "增量搜索",
      ignoreCase: "忽略大小写",
      smartCase: "智能大小写",
      ui: "界面",
      showCmd: "显示命令",
      showMode: "显示模式",
      showMatch: "匹配高亮",
      wildMenu: "命令行补全",
      files: "文件",
      backup: "备份",
      write: "写入",
      swapFile: "交换文件",
      mouseOptions: {
        disabled: "禁用",
        normal: "普通",
        visual: "可视",
        insert: "插入",
        all: "全部"
      }
    },
    theme: {
      colorScheme: "配色方案",
      background: "背景",
      preview: "颜色预览"
    },
    plugin: {
      select: "选择要启用的插件。",
      enabled: "已启用",
      disabled: "个插件"
    },
    livePreview: {
      title: "🎯 实时预览"
    },
    usageGuide: {
      title: "使用指南",
      step1: {
        title: "安装 vim-plug",
        desc: "在终端中运行以下命令："
      },
      step2: {
        title: "复制配置",
        desc: "切换到「配置」选项卡，点击配置内容即可复制，然后粘贴到 ~/.vimrc 文件中"
      },
      step3: {
        title: "安装插件",
        desc: "打开 Vim 并运行："
      },
      step4: {
        title: "重启 Vim",
        desc: "关闭并重新打开 Vim，所有设置即可生效。"
      }
    }
  }
};
