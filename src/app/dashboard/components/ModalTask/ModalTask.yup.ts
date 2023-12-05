import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export const TaskSchemaResolver = yupResolver(
  yup.object().shape({
    id: yup.string().optional(),
    name: yup.string().required(),
    status: yup.string().required(),
    dueDate: yup.string().required(),
    pointEstimate: yup.string().required(),
    tags: yup.array().of(yup.string()).required(),
    assigneeId: yup.string().required(),
  })
);
