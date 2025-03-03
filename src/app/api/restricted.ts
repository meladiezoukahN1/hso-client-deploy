import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]/options";

const restrictedHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    res.status(200).send({
      content: "هذا المحتوى محمي ويمكن رؤيته فقط من قبل المستخدمين المسجلين.",
    });
  } else {
    res.status(401).send({
      error: "يجب أن تكون مسجلاً الدخول لعرض المحتوى المحمي على هذه الصفحة.",
    });
  }
};

export default restrictedHandler;
