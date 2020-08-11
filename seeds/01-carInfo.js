exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {
          VIN: '3232123432',
          make: 'Cheverolet',
          model: 'Equinox',
          mileage: 20000
        },
        {
          VIN: '8843323420',
          make: 'Subaru',
          model: 'Outback',
          mileage: 10000,
          transmission_type: '1.8L EJ18',
          title_status: 'clean'
        }
      ])
    })
}
