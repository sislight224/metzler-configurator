import { NextApiHandler } from "next";

function getFormData(
  id: number,
  amount: number = 1,
  extraFields: string[],
  extraFieldId: number,
  jtlToken: string
) {
  const formData = new FormData();
  formData.append("jtl_token", jtlToken);
  formData.append("a", id.toString());
  formData.append("wke", "1");
  formData.append("anzahl", amount.toString());
  let i = 0;
  for (const value of extraFields) {
    formData.append(`eigenschaftwert[${extraFieldId + i}]`, value);
    i++;
  }
  return formData;
}

const handler: NextApiHandler = async (req, res) => {
  const { jtlToken, products } = req.body;

  console.log("COOKIE", req.headers.cookie);

  const fetches = products.map((product) => {
    const formData = getFormData(
      product.articleNumber,
      product.amount,
      product.extraFields ?? [],
      product.extraFieldId,
      jtlToken
    );
    console.log(
      "FORM DATA",
      JSON.stringify(Object.fromEntries(formData.entries()))
    );
    return fetch(process.env.NEXT_PUBLIC_SHOP_URL, {
      method: "POST",
      body: formData,
      headers: {
        Cookie: req.headers.cookie,
      },
    }).then((res) => res.ok);
  });

  const result = await Promise.all(fetches);

  res.status(200).json({ jtlToken });
};

export default handler;
