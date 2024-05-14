import { NextApiHandler } from "next";

function getFormData(
  id: number,
  amount: number = 1,
  extraFields: [string, string][] = [],
  jtlToken: string
) {
  const formData = new FormData();
  formData.append("jtl_token", jtlToken);
  formData.append("a", id.toString());
  formData.append("wke", "1");
  formData.append("anzahl", amount.toString());
  for (const [field, value] of extraFields) {
    formData.append(field, value);
  }
  return formData;
}

const handler: NextApiHandler = async (req, res) => {
  const { jtlToken, products } = req.body;

  const fetches = products.map((product) => {
    const formData = getFormData(
      product.id,
      product.amount,
      product.extraFields ?? [],
      jtlToken
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
