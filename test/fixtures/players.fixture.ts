export default (models: any) => {
  const Player = models.Postgres_Players

  const players = [
    {
      name: 'zhasulan',
      model: Player,
      data: {
        name: '[kz]Zhasulan',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'alexeyk',
      model: Player,
      data: {
        name: 'alexeyk',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'gamzat',
      model: Player,
      data: {
        name: '[R]Gamzat001',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'marko',
      model: Player,
      data: {
        name: 'Sai',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'lgnd',
      model: Player,
      data: {
        name: 'LGND',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'kwos',
      model: Player,
      data: {
        name: 'Kwos',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
    {
      name: 'latof',
      model: Player,
      data: {
        name: 'Latof',
        created_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
        updated_at: new Date(Date.UTC(2023, 1, 1, 0, 0, 0)),
      },
    },
  ]

  return {
    require: [],
    data: [
      ...players,
    ],
  }
}
