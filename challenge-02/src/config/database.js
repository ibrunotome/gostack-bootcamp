module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'meetaap',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
}
