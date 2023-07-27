## Technical Test Software Engineer Back End PT GITS Indonesia

### Deliverable Links
- [Documentation](https://documenter.getpostman.com/view/15801526/2s946pZUMM)

### Installation
```bash
npm install
```

Before running the app, you need to configure the environment variables in ```.env``` file. You can copy the ```.env.example``` file and rename it to ```.env```.


### Run the app
> **Note:** Make sure you have installed global dependencies: [nodemon](https://www.npmjs.com/package/nodemon), [sequelize-cli](https://www.npmjs.com/package/sequelize-cli).

```bash
# Create Database
sequelize db:create

# Migrate Database
sequelize db:migrate

# Seeder *Optional
sequelize db:seed:all

# Run the app
npm run start
```
