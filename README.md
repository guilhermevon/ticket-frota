# Sistema de Frota (Manutencao de veículos)

O repositório contém os arquivos de frontend e backend da aplicação do sistema de frota

## Pré-requisitos

Certifique-se de que você tenha as seguintes ferramentas instaladas em sua máquina:

- [Node.js](https://nodejs.org/): A plataforma de desenvolvimento JavaScript.
- [npm](https://www.npmjs.com/) Gerenciadores de pacotes para instalar dependências.
- [pm2](https://pm2.keymetrics.io/docs/usage/quick-start/) Ferramenta de controle de servidor

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/seuusuario/ticket-frota-aplicacao.git
   ```

2. Navegue até a pasta do projeto:

   ```bash
   cd ticket-frota
   cd frota
   cd front
   ```

3. Instale as depencencias:

   ```bash
   npm i
   ```

4. Faça as configurações no arquivo dbConfig.js para a conexão com o banco de dados MySQL

### Estrutura de arquivos

- /db: Arquivos para a conexão e configuração do banco de dados.
- /routes: Definições de rotas da API.

### Iniciando o Servidor mySQL no Debian

   - Provável Id fixo do container mySQL: `2677841935ed`
   - Para iniciar o container mySQL cole o comando a seguir:
 ```
 docker start 2677841935ed
 ``` 


### Configuração

- dbConfig.js: Arquivo de configuração para a conexão com o banco de dados MySQL.
