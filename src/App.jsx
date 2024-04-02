//

export default function App() {
  const integrationID = 4548473;
  const apiKey =
    "ZXlKaGJHY2lPaUpJVXpVeE1pSXNJblI1Y0NJNklrcFhWQ0o5LmV5SmpiR0Z6Y3lJNklrMWxjbU5vWVc1MElpd2ljSEp2Wm1sc1pWOXdheUk2T1RZNE9EQXhMQ0p1WVcxbElqb2lhVzVwZEdsaGJDSjkuSUM2cnpkTzBYVTVHM0lQeWd2TGtuUnV3QWNzOGdNcTlVcVdkcjI1azJYTEt1UTNRVEpURFUxV0JCaDJxajd5N1pEYjJIcFdzX3dVaHVQWDBOSWIycWc=";

  const handelStepOne = async () => {
    const data = {
      api_key: apiKey,
    };

    const request = await fetch("https://accept.paymob.com/api/auth/tokens", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const responce = await request.json();
    const token = responce.token;
    console.log("token--------", token);

    handelStepTwo(token);
  };
  // --------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------
  const handelStepTwo = async (token) => {
    let data = {
      auth_token: token,
      delivery_needed: "false",
      amount_cents: "100",
      currency: "EGP",
      items: [],
    };

    const request = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const responce = await request.json();
    console.log("responce-------", responce);
    handelStepThree(responce.id, token);
  };

  // --------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------
  const handelStepThree = async (id, token) => {
    let data = {
      auth_token: token,
      amount_cents: "100",
      expiration: 3600,
      order_id: id,
      billing_data: {
        apartment: "803",
        email: "claudette09@exa.com",
        floor: "42",
        first_name: "Clifford",
        street: "Ethan Land",
        building: "8028",
        phone_number: "+86(8)9135210487",
        shipping_method: "PKG",
        postal_code: "01898",
        city: "Jaskolskiburgh",
        country: "CR",
        last_name: "Nicolas",
        state: "Utah",
      },
      currency: "EGP",
      integration_id: integrationID,
    };
    const request = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );
    const responce = await request.json();
    const tokenThird = responce.token;
    console.log("tokenThird---------------", tokenThird);
    cardFrame(tokenThird);
  };
  // --------------------------------------------------------------------------------------------------------
  // --------------------------------------------------------------------------------------------------------
  const cardFrame = async (tokenThird) => {
    const iFrameToken = `https://accept.paymob.com/api/acceptance/iframes/835693?payment_token=${tokenThird}`;
    location.href = iFrameToken;
    // console.log(tokenThird);
  };

  return (
    <>
      <div>
        <button onClick={handelStepOne}> Step One </button>
      </div>
    </>
  );
}
