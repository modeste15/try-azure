const CosmosClient = require("@azure/cosmos").CosmosClient;
const config = require("./config");

const main = async () => {
  const client = new CosmosClient({
    endpoint: config.endpoint,
    key: config.key
  });

  const database = client.database(config.databaseId);
  const container = database.container(config.containerId);

  // Utilisez le container pour effectuer des opérations CRUD sur les documents.
  // Par exemple, pour insérer un document :
  const products = generateEcommerceItems() ;
  try {
    for (const document of products) {
      await container.items.create(document);
    }
    console.log('Data inserted successfully.');
  } catch (error) {
    console.error('Error inserting data:', error);
  }
};

// Appel de la fonction principale
main().catch((error) => {
  console.error(error);
  process.exit(1);
});



function generateEcommerceItems() {
  const items = [];

  for (let i = 2; i <= 200; i++) {
    const itemName = `Product ${i}`;
    const itemDescription = `Description for Product ${i}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.`;
    const itemPrice = (Math.random() * (500 - 10) + 10).toFixed(2); // Prix aléatoire entre 10 et 500
    const itemQuantity = Math.floor(Math.random() * 100) + 1; // Quantité aléatoire entre 1 et 100

    const item = {
      id: `${i}`,
      name: itemName,
      description: itemDescription,
      price: parseFloat(itemPrice),
      quantity: itemQuantity,
    };

    items.push(item);
  }

  return items;
}