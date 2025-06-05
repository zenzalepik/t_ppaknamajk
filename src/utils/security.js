import DOMPurify from 'dompurify';
import sanitizeHtml from 'sanitize-html';

export function sanitizeInput(input) {
  return sanitizeHtml(DOMPurify.sanitize(input));
}
