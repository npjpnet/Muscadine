import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
html, body, #root {
  height: 100%;
}

body {
  font-family: 'Noto Sans JP', system-ui, sans-serif;
}

* {
  box-sizing: border-box;
}

html, body,
h1, h2, h3, h4, h5, h6,
p, ul, ol {
  margin: 0;
  padding: 0;
}

p, ul, ol,
table,
h1, h2, h3, h4, h5, h6 {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

p {
  line-height: 1.5em;
}

h1, h2, h3, h4, h5,h6 {
  color: var(--primary-color);
}
h1 { font-size: 2em; }
h2 { font-size: 1.75em; }
h3 { font-size: 1.5em; }
h4 { font-size: 1.25em; }
h5 { font-size: 1em; }
h6 { font-size: 0.9em; }

a {
  color: var(--primary-color);
  font-weight: bold;
}

ul, ol {
  padding-left: 2em;
}

table {
  width: 100%;
  border-collapse: collapse;

  thead {
    tr {
      background-color: transparent;
    }
  }
  tbody {
    border-top: 2px solid var(--primary-color);
    border-bottom:  2px solid var(--primary-color);
  }

  tr {
    background-color: #f8f8f8;
    &:nth-child(2n) {
      background-color: #f0f0f0;
    }
  }
  th, td {
    padding: 10px;
    text-align: left;
  }
}
`

export default GlobalStyle
