
import publicKey from "./helpers/public-key";

export const handler = async (event, context) => {

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ publicKey })
  };
  
}
