import { InfoIcon } from "./InfoIcon";
import { RadioDropdown } from "./RadioDropdown";
import { TextArea } from "./TextArea";

export function AssertionForm() {
  return (
    <form>
      <div>
        <label htmlFor="assertion-statement">
          Assertion Statement{" "}
          <InfoIcon>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nostrum,
            labore.
          </InfoIcon>
        </label>
        <TextArea id="assertion-statement" />
        <label htmlFor="currency">
          Currency:{" "}
          <InfoIcon>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa
            impedit distinctio amet eligendi sit possimus suscipit totam illum
            deleniti quae neque obcaecati, fugiat ipsum consectetur, autem eaque
            aliquam. Fugit molestiae pariatur vitae sint ipsa tempore, fugiat
            similique deserunt necessitatibus. Aliquam itaque ipsam quos dolores
            cupiditate ducimus asperiores repellat consequuntur quas.
          </InfoIcon>
        </label>
        <RadioDropdown id="currency" />
      </div>
    </form>
  );
}
