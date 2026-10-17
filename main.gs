function doGet(e) {
  return handleResponse({ status: 'ok', method: 'GET', route: e.parameter?.route || 'home' });
}

function doPost(e) {
  const params = JSON.parse(e.postData?.contents || '{}');
  const action = params.action || e.parameter?.action || 'unknown';
  return handleResponse({ status: 'ok', method: 'POST', action: action, data: params.data || null });
}

function doPut(e) {
  const params = JSON.parse(e.postData?.contents || '{}');
  return handleResponse({ status: 'ok', method: 'PUT', action: params.action || 'unknown', data: params.data || null });
}

function doDelete(e) {
  return handleResponse({ status: 'ok', method: 'DELETE', route: e.parameter?.route || 'unknown' });
}

function handleResponse(data, code) {
  code = code || 200;
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(ContentService.MimeType.JSON);
}
