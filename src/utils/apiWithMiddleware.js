import { use } from "next-api-middleware";
import addRequestId from "../middlewares/addRequestId";
import checkMethodAccess from "../middlewares/checkMethodAccess";

export default use(
    addRequestId,
    checkMethodAccess
);
