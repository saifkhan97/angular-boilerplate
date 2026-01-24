/**
 * Generic modal configuration
 * Used by shared modal / confirm dialog components
 */
export interface ModalConfig {
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  closable?: boolean;
}
