# Sistema de Frota (Manutencao de veículos)

O repositório contém os arquivos de frontend e backend da aplicação do sistema de frota

## Pré-requisitos

Certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/): A plataforma de desenvolvimento JavaScript.
- [npm](https://www.npmjs.com/) Gerenciadores de pacotes para instalar dependências.
- [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) Ferramenta de controle de servidor

## Instalação

1. Instale o pm2 na maquina

   ```bash
   npm install pm2@latest -g
   ```

2. Clone este repositório:

   ```bash
   git clone https://github.com/seuusuario/backend-aplicacao.git
   ```

3. Navegue até a pasta do projeto:

   ```bash
   cd backend
   ```

4. Instale as depencencias:

   ```bash
   npm i
   ```

5. Faça as configurações no arquivo dbConfig.js para a conexão com o banco de dados MySQL

### Estrutura de arquivos

- /db: Arquivos para a conexão e configuração do banco de dados.
- /routes: Definições de rotas da API.
- server.js: Arquivo principal do servidor.
- ecosystem.config.js: Arquivo de configuração do PM2.(no servidor Debian não é mais utilizado o PM2)
- service.js: Arquivo com a tentativa de criar um serviço para o Windows.

### Configuração

- dbConfig.js: Arquivo de configuração para a conexão com o banco de dados MySQL.
