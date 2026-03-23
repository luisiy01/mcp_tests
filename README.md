# Primer MCP Server 🚀

Este es un servidor MCP (Model Context Protocol) básico construido con TypeScript. El servidor expone herramientas y recursos que pueden ser utilizados por clientes compatibles con MCP para interactuar con la IA de manera estructurada a través de la interfaz estándar de entrada/salida (Stdio).

## 📦 Características

El servidor (`servidor-mcp-luis` v1.0.0) provee las siguientes funcionalidades:

### 🛠️ Herramientas (Tools)

- **`multiplicar`**: Multiplica dos números.
  - Campos requeridos: `numero1` (number), `numero2` (number).
  - Devuelve: El resultado de la multiplicación en formato de texto.

### 📄 Recursos (Resources)

- **`saludar://{nombre}`**: Un template de recurso dinámico para saludar.
  - Parámetros: `{nombre}` de la persona a saludar.
  - Devuelve: Un mensaje de texto con el formato `Hola, saludos terricola {nombre}`.

## 🚀 Instalación y Uso

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión recomendada 20 o superior).

1. **Clona el repositorio** o entra en el directorio del proyecto:
   ```bash
   cd mcp_tests
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Compila el código TypeScript**:
   ```bash
   npx tsc
   ```

4. **Inicia el inspector de MCP** (Opcional, para probar el servidor de forma local y visual):
   ```bash
   npx @modelcontextprotocol/inspector node ./main.js
   ```

## 🛠️ Tecnologías

- [@modelcontextprotocol/sdk](https://www.npmjs.com/package/@modelcontextprotocol/sdk) - SDK Oficial de MCP
- [Zod](https://zod.dev/) - Validación esquemática de datos
- [TypeScript](https://www.typescriptlang.org/) - JavaScript tipado

## 🔌 Configuración para Cliente MCP (ej. Claude Desktop)

Para utilizar este servidor en un cliente MCP (como Claude para Desktop), añade la siguiente configuración a tu archivo JSON de configuración de servidores (por ejemplo, `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "servidor-mcp-luis": {
      "command": "node",
      "args": [
        "D:\\misproys\\mcp\\mcp_tests\\main.js"
      ],
      "cwd": "D:\\misproys\\mcp\\mcp_tests"
    }
  }
}
```
