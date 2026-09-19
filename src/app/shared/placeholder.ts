/**
 * Data values written as `[Add Something]` are placeholders for information
 * that has not been provided yet. They are displayed as marked labels and are
 * never rendered as links.
 */
export function isPlaceholder(value: string | null | undefined): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  return trimmed.startsWith('[') && trimmed.endsWith(']');
}
