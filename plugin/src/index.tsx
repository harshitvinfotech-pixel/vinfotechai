import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChatWidget } from './ChatWidget';
import type { ChatWidgetConfig } from './types';
import { mergeConfig, validateConfig, injectStyles, removeStyles } from './utils';
import './styles.css';

class VinfotechChatWidget {
  private root: ReactDOM.Root | null = null;
  private container: HTMLDivElement | null = null;
  private config: ChatWidgetConfig | null = null;
  private isInitialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      (window as any).VinfotechChatWidget = this;
    }
  }

  init(userConfig: Partial<ChatWidgetConfig>): void {
    if (this.isInitialized) {
      console.warn('VinfotechChatWidget is already initialized');
      return;
    }

    const validation = validateConfig(userConfig);
    if (!validation.valid) {
      console.error('Invalid configuration:', validation.errors);
      throw new Error(`Configuration validation failed: ${validation.errors.join(', ')}`);
    }

    this.config = mergeConfig(userConfig);

    if (this.config.customization?.css) {
      injectStyles(this.config.customization.css);
    }

    this.createContainer();
    this.render();
    this.isInitialized = true;

    const version = this.config.version || '1.0.0';
    console.log(`VinfotechChatWidget v${version} initialized successfully`);
  }

  private createContainer(): void {
    this.container = document.createElement('div');
    this.container.id = 'vinfotech-chat-widget-root';

    if (this.config?.customization?.className) {
      this.container.className = this.config.customization.className;
    }

    document.body.appendChild(this.container);
  }

  private render(): void {
    if (!this.container || !this.config) {
      console.error('Cannot render: container or config is missing');
      return;
    }

    this.root = ReactDOM.createRoot(this.container);
    this.root.render(
      <React.StrictMode>
        <ChatWidget config={this.config} />
      </React.StrictMode>
    );
  }

  destroy(): void {
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }

    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
      this.container = null;
    }

    removeStyles();
    this.isInitialized = false;
    this.config = null;

    console.log('VinfotechChatWidget destroyed');
  }

  open(): void {
    console.log('Open method not yet implemented');
  }

  close(): void {
    console.log('Close method not yet implemented');
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  getVersion(): string {
    return this.config?.version || '1.0.0';
  }
}

const widget = new VinfotechChatWidget();

if (typeof window !== 'undefined') {
  (window as any).VinfotechChatWidget = widget;

  if ((window as any).vinfotechChatConfig) {
    widget.init((window as any).vinfotechChatConfig);
  }
}

export default VinfotechChatWidget;
export { ChatWidget, type ChatWidgetConfig };
