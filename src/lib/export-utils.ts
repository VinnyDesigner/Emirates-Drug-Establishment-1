/**
 * Export utilities for tabular data and PDF printing
 */

export function exportToCSV<T extends object>(
  arg1: string | T[],
  arg2?: T[] | string,
  headers?: { key: keyof T; label: string }[]
) {
  let filename = 'export';
  let rows: T[] = [];

  if (typeof arg1 === 'string') {
    filename = arg1;
    rows = (arg2 as T[]) || [];
  } else {
    rows = arg1 || [];
    filename = (arg2 as string) || 'export';
  }

  if (!rows || !rows.length) return;

  const resolvedHeaders =
    headers ||
    (Object.keys(rows[0]) as (keyof T)[]).map((k) => ({
      key: k,
      label: String(k),
    }));


  const csvRows: string[] = [];

  // Header row
  csvRows.push(
    resolvedHeaders
      .map((h) => `"${String(h.label).replace(/"/g, '""')}"`)
      .join(',')
  );

  // Data rows
  for (const row of rows) {
    const values = resolvedHeaders.map((h) => {
      const val = (row as Record<string, unknown>)[h.key as string];
      if (val === null || val === undefined) return '""';
      if (typeof val === 'object') return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
      return `"${String(val).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  }

  const csvString = '\uFEFF' + csvRows.join('\r\n'); // Add BOM for Excel UTF-8 Arabic/English support
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function printFormattedReport(
  title: string,
  subtitle: string,
  tableHtml: string
) {
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html dir="ltr">
    <head>
      <title>${title}</title>
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif; padding: 24px; color: #1E293B; }
        .header { border-bottom: 2px solid #142B52; padding-bottom: 12px; margin-bottom: 20px; }
        .title { color: #142B52; font-size: 22px; font-weight: bold; margin: 0 0 4px 0; }
        .subtitle { color: #64748B; font-size: 13px; margin: 0; }
        .meta { margin-top: 8px; font-size: 11px; color: #94A3B8; }
        table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 12px; }
        th { background: #F8FAFC; color: #1E293B; font-weight: 600; text-align: left; padding: 10px 8px; border: 1px solid #E2E8F0; }
        td { padding: 8px; border: 1px solid #E2E8F0; }
        tr:nth-child(even) { background: #F8FAFC; }
        .badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 11px; font-weight: 500; }
        @media print {
          body { padding: 0; }
          button { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1 class="title">Emirates Drug Establishment — مؤسسة الإمارات للدواء</h1>
        <p class="subtitle">${title} — ${subtitle}</p>
        <p class="meta">Generated: ${new Date().toLocaleString()} | Official Outsourcing Audit Document</p>
      </div>
      <div>
        ${tableHtml}
      </div>
      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
