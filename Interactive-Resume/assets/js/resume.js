const state = {
  data: null,
  view: 'experience',
  expanded: new Set(),
};

const timeline = document.querySelector('[data-timeline]');
const status = document.querySelector('[data-status]');
const tabs = [...document.querySelectorAll('[data-view]')];

function formatDate(value) {
  if (!value) return 'Present';
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${value}T00:00:00Z`));
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
}

function renderDetails(description) {
  const details = createElement('div', 'entry-details');
  const lines = description.split('\n').filter(Boolean);
  const meta = lines.find((line) => !line.startsWith('•'));
  const points = lines.filter((line) => line.startsWith('•'));

  if (meta) details.append(createElement('p', 'entry-meta', meta));
  if (points.length) {
    const list = createElement('ul', 'entry-points');
    points.forEach((point) => list.append(createElement('li', '', point.slice(1).trim())));
    details.append(list);
  }

  return details;
}

function renderTimeline() {
  const entries = [...state.data[state.view]].reverse();
  timeline.replaceChildren();

  entries.forEach((entry, index) => {
    const id = `${state.view}-${index}`;
    const isExpanded = state.expanded.has(id) || entry.default_item;
    const item = createElement('article', `timeline-entry${entry.default_item ? ' is-current' : ''}`);
    const marker = createElement('div', 'timeline-marker');
    marker.setAttribute('aria-hidden', 'true');

    const button = createElement('button', 'entry-toggle');
    button.type = 'button';
    button.setAttribute('aria-expanded', String(isExpanded));
    button.setAttribute('aria-controls', `${id}-details`);

    const period = createElement('span', 'entry-period', `${formatDate(entry.from)} — ${formatDate(entry.to)}`);
    const heading = createElement('span', 'entry-heading');
    heading.append(
      createElement('strong', '', entry.title),
      createElement('span', '', entry.institution),
    );
    const symbol = createElement('span', 'entry-symbol', isExpanded ? '−' : '+');
    symbol.setAttribute('aria-hidden', 'true');
    button.append(period, heading, symbol);

    const details = renderDetails(entry.description);
    details.id = `${id}-details`;
    details.hidden = !isExpanded;

    button.addEventListener('click', () => {
      if (state.expanded.has(id) || (entry.default_item && !state.expanded.has(id))) {
        state.expanded.add(id);
      }
      const open = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!open));
      symbol.textContent = open ? '+' : '−';
      details.hidden = open;
      state.expanded[open ? 'delete' : 'add'](id);
    });

    item.append(marker, button, details);
    timeline.append(item);
  });
}

function setView(view) {
  state.view = view;
  tabs.forEach((tab) => {
    const active = tab.dataset.view === view;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  renderTimeline();
}

async function initialize() {
  try {
    const response = await fetch('./assets/data/resume.json');
    if (!response.ok) throw new Error(`Unable to load résumé data (${response.status})`);
    state.data = await response.json();
    document.querySelector('[data-role-count]').textContent = `${state.data.experience.length} roles`;
    document.querySelector('[data-year-count]').textContent = '12+ years';
    document.querySelector('[data-degree-count]').textContent = `${state.data.study.length} degrees`;
    setView('experience');
    status.hidden = true;
  } catch (error) {
    status.textContent = error.message;
    status.classList.add('is-error');
  }
}

tabs.forEach((tab) => tab.addEventListener('click', () => setView(tab.dataset.view)));

document.querySelector('[data-theme]').addEventListener('click', () => {
  const dark = document.documentElement.dataset.theme === 'dark';
  document.documentElement.dataset.theme = dark ? 'light' : 'dark';
  localStorage.setItem('interactive-resume-theme', dark ? 'light' : 'dark');
});

document.documentElement.dataset.theme = localStorage.getItem('interactive-resume-theme') || 'light';
document.querySelector('[data-year]').textContent = new Date().getFullYear();
initialize();
