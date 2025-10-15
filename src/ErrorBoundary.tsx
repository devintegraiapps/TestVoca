import React from 'react';

type Props = { children: React.ReactNode };
type State = { hasError: boolean; message?: string; stack?: string };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };
  static getDerivedStateFromError(error: any): State {
    return { hasError: true, message: String(error?.message || error), stack: String(error?.stack || '') };
  }
  componentDidCatch(error: any, info: any) {
    console.error('ErrorBoundary capturou:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 16, color: '#fff', background: '#111', fontFamily: 'ui-sans-serif, system-ui' }}>
          <h1 style={{ fontSize: 18, marginBottom: 8 }}>Ops, ocorreu um erro no app.</h1>
          {this.state.message && <pre style={{ whiteSpace: 'pre-wrap' }}><b>Mensagem:</b> {this.state.message}</pre>}
          {this.state.stack && (
            <details open style={{ marginTop: 8 }}>
              <summary style={{ cursor: 'pointer' }}>Detalhes técnicos</summary>
              <pre style={{ whiteSpace: 'pre-wrap' }}>{this.state.stack}</pre>
            </details>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}
