# Servidor MCP de Proyectos 🚀

Este es un servidor MCP (Model Context Protocol) construido con TypeScript para gestionar proyectos a través de un API REST. El servidor expone herramientas que pueden ser utilizadas por clientes compatibles con MCP para interactuar con la IA de manera estructurada a través de la interfaz estándar de entrada/salida (Stdio).

## 📦 Características

El servidor (`servidor-mcp-proyectos` v1.0.0) provee las siguientes funcionalidades conectándose a un backend local en `http://localhost:3000/api/project`.

### 🛠️ Herramientas (Tools)

- **`listar_proyectos`**: Devuelve la lista completa de proyectos.
- **`obtener_proyecto`**: Devuelve los datos de un proyecto específico.
  - Campos requeridos: `id` (string).
- **`guardar_proyecto`**: Crea un nuevo proyecto.
  - Campos requeridos: `name` (string), `description` (string), `state` (string).
- **`actualizar_proyecto`**: Actualiza los datos de un proyecto por su ID.
  - Campos requeridos: `id` (string).
  - Campos opcionales: `name` (string), `description` (string), `state` (string).
- **`eliminar_proyecto`**: Elimina un proyecto por su ID.
  - Campos requeridos: `id` (string).
- **`obtener_imagen_proyecto`**: Obtiene la imagen de un proyecto en formato base64 (retorna un tipo 'image' para MCP).
  - Campos requeridos: `file` (string).

## 🚀 Instalación y Uso

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión recomendada 20 o superior) y que tu API en el puerto 3000 esté en ejecución.

1. **Entra en el directorio del proyecto**:
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
- [TypeScript](https://www.typescriptlang.org/) - tipado estático
- Node.js (fetch nativo / sistema de archivos)

## 🔌 Configuración para Cliente MCP (ej. Claude Desktop)

Para utilizar este servidor con un cliente MCP (como Claude para Desktop), añade la siguiente configuración a tu archivo JSON de configuración de servidores (por ejemplo, `claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "servidor-mcp-proyectos": {
      "command": "node",
      "args": [
        "D:\\misproys\\mcp\\mcp_api\\mcp_tests\\main.js"
      ],
      "cwd": "D:\\misproys\\mcp\\mcp_api\\mcp_tests"
    }
  }
}
```
