import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, CSSProperties, InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react';
import type * as React from 'react';

type ButtonType = 'primary' | 'default' | 'dashed' | 'text' | 'link';
type ButtonProps = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> & {
  type?: ButtonType;
  htmlType?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'middle' | 'large';
  block?: boolean;
  loading?: boolean;
  danger?: boolean;
  ghost?: boolean;
  icon?: ReactNode;
};

function cx(...values: Array<string | false | undefined>) {
  return values.filter(Boolean).join(' ');
}

export function Button({
  type = 'default', htmlType = 'button', size = 'middle', block = false, loading = false,
  danger = false, ghost = false, icon, className, children, disabled, ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      type={htmlType}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cx('ui-button', `ui-button--${type}`, `ui-button--${size}`, block && 'ui-button--block', danger && 'ui-button--danger', ghost && 'ui-button--ghost', className)}
    >
      {icon && <span className="ui-button-icon" aria-hidden="true">{icon}</span>}
      {loading && <span className="ui-button-spinner" aria-hidden="true" />}
      {children !== null && children !== undefined && <span className="ui-button-label">{children}</span>}
    </button>
  );
}

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  type?: 'default' | 'dashed';
  color?: string;
  pattern?: string;
  hoverable?: boolean;
};

export function Card({ type = 'default', color: _color, pattern: _pattern, hoverable = false, className, ...props }: CardProps) {
  void _color;
  void _pattern;
  return <div {...props} className={cx('ui-card', `ui-card--${type}`, hoverable && 'ui-card--hoverable', className)} />;
}

type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> & {
  size?: 'small' | 'middle' | 'large';
  prefix?: ReactNode;
  suffix?: ReactNode;
  allowClear?: boolean;
  status?: 'error' | 'warning';
  shadow?: boolean;
  onClear?: () => void;
  clearAriaLabel?: string;
};

export function Input({
  size = 'middle', prefix, suffix, allowClear, status, shadow = false, className,
  onClear, clearAriaLabel = '清除', value, defaultValue, onChange, ...props
}: InputProps) {
  const [innerValue, setInnerValue] = useState(defaultValue ?? '');
  const currentValue = value === undefined ? innerValue : value;
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (value === undefined) setInnerValue(event.target.value);
    onChange?.(event);
  };
  const input = (
    <input
      {...props}
      value={currentValue}
      onChange={handleChange}
      className={cx('ui-input', `ui-input--${size}`, status && `ui-input--${status}`, shadow && 'ui-input--shadow', className)}
    />
  );
  if (!prefix && !suffix && !allowClear) return input;
  return (
    <span className={cx('ui-input-wrap', `ui-input-wrap--${size}`, status && `ui-input-wrap--${status}`, shadow && 'ui-input-wrap--shadow')}>
      {prefix && <span className="ui-input-prefix" aria-hidden="true">{prefix}</span>}
      {input}
      {allowClear && Boolean(currentValue) && (
        <button type="button" className="ui-input-clear" aria-label={clearAriaLabel} onClick={() => { setInnerValue(''); onClear?.(); }}>
          <span aria-hidden="true">×</span>
        </button>
      )}
      {suffix && <span className="ui-input-suffix" aria-hidden="true">{suffix}</span>}
    </span>
  );
}

type SelectOption = { key: string; label: string };
type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> & {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  allowClear?: boolean;
  onClear?: () => void;
  clearAriaLabel?: string;
  showSearch?: boolean;
  filterOption?: boolean | ((inputValue: string, option: SelectOption) => boolean);
  optionFilterProp?: 'key' | 'label';
  onSearch?: (value: string) => void;
  notFoundContent?: ReactNode;
};

export function Select({ options, value, onChange, placeholder, allowClear = false, onClear, clearAriaLabel = '清除', showSearch: _showSearch, filterOption: _filterOption, optionFilterProp: _optionFilterProp, onSearch: _onSearch, notFoundContent: _notFoundContent, className, ...props }: SelectProps) {
  void _showSearch;
  void _filterOption;
  void _optionFilterProp;
  void _onSearch;
  void _notFoundContent;
  return (
    <span className="ui-select-wrap">
      <select {...props} className={cx('ui-select', className)} value={value} onChange={(event) => onChange(event.target.value)}>
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map(({ key, label }) => <option key={key} value={key}>{label}</option>)}
      </select>
      {allowClear && value && <button type="button" className="ui-select-clear" aria-label={clearAriaLabel} onClick={() => { onClear?.(); if (!onClear) onChange(''); }}>×</button>}
      <span className="ui-select-chevron" aria-hidden="true">⌄</span>
    </span>
  );
}

type ChoiceOption = { label: ReactNode; value: string | number; disabled?: boolean };

type RadioProps = {
  value?: string | number;
  defaultValue?: string | number;
  options: ChoiceOption[];
  size?: 'small' | 'middle' | 'large';
  disabled?: boolean;
  direction?: 'horizontal' | 'vertical';
  onChange?: (value: string | number) => void;
  className?: string;
  style?: CSSProperties;
};

export function Radio({ value, defaultValue, options, size = 'middle', disabled = false, direction = 'horizontal', onChange, className, style }: RadioProps) {
  const groupId = useId();
  const [innerValue, setInnerValue] = useState(defaultValue);
  const selected = value === undefined ? innerValue : value;
  return (
    <div className={cx('ui-radio-group', `ui-choice-group--${direction}`, `ui-choice-group--${size}`, className)} style={style}>
      {options.map((option) => {
        const checked = selected === option.value;
        return (
          <label className={cx('ui-radio-option', checked && 'is-checked', (disabled || option.disabled) && 'is-disabled')} key={`${groupId}-${option.value}`}>
            <input type="radio" name={groupId} value={String(option.value)} checked={checked} disabled={disabled || option.disabled} onChange={() => { setInnerValue(option.value); onChange?.(option.value); }} />
            <span className="ui-radio-mark" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

type CheckboxProps = Omit<RadioProps, 'value' | 'defaultValue' | 'onChange'> & {
  value?: Array<string | number>;
  defaultValue?: Array<string | number>;
  onChange?: (values: Array<string | number>) => void;
};

export function Checkbox({ value, defaultValue = [], options, size = 'middle', disabled = false, direction = 'horizontal', onChange, className, style }: CheckboxProps) {
  const groupId = useId();
  const [innerValues, setInnerValues] = useState(defaultValue);
  const selected = value === undefined ? innerValues : value;
  return (
    <div className={cx('ui-checkbox-group', `ui-choice-group--${direction}`, `ui-choice-group--${size}`, className)} style={style}>
      {options.map((option) => {
        const checked = selected.includes(option.value);
        return (
          <label className={cx('ui-checkbox-option', checked && 'is-checked', (disabled || option.disabled) && 'is-disabled')} key={`${groupId}-${option.value}`}>
            <input type="checkbox" checked={checked} disabled={disabled || option.disabled} onChange={(event) => {
              const next = event.target.checked ? [...selected, option.value] : selected.filter((item) => item !== option.value);
              setInnerValues(next);
              onChange?.(next);
            }} />
            <span className="ui-checkbox-mark" aria-hidden="true" />
            <span>{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

type SwitchProps = {
  checked?: boolean;
  defaultChecked?: boolean;
  size?: 'small' | 'default';
  disabled?: boolean;
  loading?: boolean;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  onChange?: (checked: boolean) => void;
  className?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

export function Switch({ checked, defaultChecked = false, size = 'default', disabled = false, loading = false, checkedChildren, unCheckedChildren, onChange, className, ...ariaProps }: SwitchProps) {
  const [innerChecked, setInnerChecked] = useState(defaultChecked);
  const active = checked === undefined ? innerChecked : checked;
  return (
    <label className={cx('ui-switch', `ui-switch--${size}`, active && 'is-checked', (disabled || loading) && 'is-disabled', className)}>
      <input {...ariaProps} type="checkbox" role="switch" checked={active} disabled={disabled || loading} onChange={(event) => { setInnerChecked(event.target.checked); onChange?.(event.target.checked); }} />
      <span className="ui-switch-track"><span className="ui-switch-thumb" /></span>
      {(checkedChildren || unCheckedChildren) && <span className="ui-switch-label">{active ? checkedChildren : unCheckedChildren}</span>}
    </label>
  );
}

type ProgressProps = {
  percent: number;
  size?: 'small' | 'middle' | 'large';
  showInfo?: boolean;
  infoFormat?: (percent: number) => ReactNode;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  'aria-label'?: string;
  'aria-labelledby'?: string;
};

export function Progress({ percent, size = 'middle', showInfo = false, infoFormat, duration = 0.25, className, style, ...ariaProps }: ProgressProps) {
  const boundedPercent = Math.max(0, Math.min(100, percent));
  return (
    <div className={cx('ui-progress', `ui-progress--${size}`, className)} style={style}>
      <div {...ariaProps} className="ui-progress-track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(boundedPercent)}>
        <span className="ui-progress-fill" style={{ transform: `scaleX(${boundedPercent / 100})`, transitionDuration: `${Math.max(0, duration)}s` }} />
      </div>
      {showInfo && <span className="ui-progress-info">{infoFormat ? infoFormat(boundedPercent) : `${Math.round(boundedPercent)}%`}</span>}
    </div>
  );
}

type UploadCustomRequestOptions = {
  file: File;
  onProgress: (percent: number) => void;
  onSuccess: (response?: unknown) => void;
  onError: (error?: unknown) => void;
};

type UploadProps = {
  accept?: string;
  multiple?: boolean;
  maxCount?: number;
  disabled?: boolean;
  directory?: boolean;
  showUploadList?: boolean;
  customRequest?: (options: UploadCustomRequestOptions) => void;
  'aria-label'?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function Upload({ accept, multiple = false, maxCount = 0, disabled = false, directory: _directory, showUploadList: _showUploadList, customRequest, className, style, children, ...ariaProps }: UploadProps) {
  void _directory;
  void _showUploadList;
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <span className={cx('ui-upload', disabled && 'is-disabled', className)} style={style}>
      <input
        {...ariaProps}
        ref={inputRef}
        className="ui-upload-input"
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []).slice(0, maxCount > 0 ? maxCount : undefined);
          for (const file of files) customRequest?.({ file, onProgress: () => undefined, onSuccess: () => undefined, onError: () => undefined });
          event.target.value = '';
        }}
      />
      <button type="button" className="ui-upload-trigger" disabled={disabled} onClick={() => inputRef.current?.click()}>{children ?? '选择文件'}</button>
    </span>
  );
}

type ModalProps = {
  open: boolean;
  variant?: 'default' | 'game';
  title?: ReactNode;
  width?: number | string;
  maskClosable?: boolean;
  footer?: ReactNode | null;
  onClose?: () => void;
  children?: ReactNode;
  className?: string;
  maskStyle?: CSSProperties;
};

export function Modal({ open, variant = 'default', title, width, maskClosable = true, footer, onClose, children, className, maskStyle }: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    const getFocusable = () => [...(dialog?.querySelectorAll<HTMLElement>('button:not(:disabled), [href], input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])') ?? [])]
      .filter((element) => element.getAttribute('aria-hidden') !== 'true' && element.getClientRects().length > 0);
    const firstControl = getFocusable()[0];
    (firstControl ?? dialog)?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current?.();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        dialog?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);
  if (!open) return null;
  return (
    <div className="ui-modal-backdrop" style={maskStyle} onMouseDown={(event) => { if (maskClosable && event.target === event.currentTarget) onClose?.(); }}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={title ? titleId : undefined} tabIndex={-1} className={cx('ui-modal', `ui-modal--${variant}`, className)} style={{ maxWidth: typeof width === 'number' ? `${width}px` : width }}>
        {title && <h2 className="ui-modal-title" id={titleId}>{title}</h2>}
        <div className="ui-modal-body">{children}</div>
        {footer !== null && footer !== undefined && <div className="ui-modal-footer">{footer}</div>}
      </div>
    </div>
  );
}

export type { UploadCustomRequestOptions };
