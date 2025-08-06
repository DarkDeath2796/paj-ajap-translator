const button = document.getElementById('translate-button')

async function translate() {
  const text = document.getElementById('orig').value;
  
  try {
    const res = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random?language=en');
    const data = await res.json();
    document.getElementById('paj').value = data.text;
  } catch (e) {
    document.getElementById('paj').value = 'Translating...';
  }

  button.disabled = true;

  try {
    const response = await fetch('https://pat317495.onrender.com/api/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    document.getElementById('paj').value = data.translation || '⚠️ No translation';
    document.getElementById('thoughs').value = data.raw || '';
  } catch (e) {
    document.getElementById('paj').value = '⚠️ Translation error';
    alert(e)
  }
  button.disabled = false
}

button.onclick = translate;
