"use client";

import { useIsClient } from "usehooks-ts";
import styles from "./AssertionForm.module.css";
import { Form } from "./Form";
import { Preview } from "./Preview";
import { useAssertionForm } from "./useAssertionForm";

export function AssertionForm() {
  const isClient = useIsClient();
  const props = useAssertionForm();

  if (!isClient) return null;

  return (
    <div className={styles.wrapper}>
      <Form {...props} />
      <Preview {...props} />
    </div>
  );
}
