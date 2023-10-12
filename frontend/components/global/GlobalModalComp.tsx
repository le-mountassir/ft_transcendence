import { ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { act } from "react-dom/test-utils";

interface GlobalModalCompProps {
  onClose: any;
  action: string;
  object?: string;
}
function GlobalModalComp({ onClose, action, object }: GlobalModalCompProps) {
  return (
    <div className="">
      <ModalHeader className="flex flex-col  items-center">
        <h1 className="text-white font-ClashGrotesk-Medium text-2xl">
          Are you Sure,
        </h1>
        <span className="text-white font-ClashGrotesk-Medium text-2xl">
          You want to {action} {object}?
        </span>
      </ModalHeader>

      <ModalFooter>
        <Button
          // color="danger"
          className="bg-inherit text-white font-ClashGrotesk-Medium text-base text-center mr-4"
          // variant="light"
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          className="bg-buttonbg text-white font-ClashGrotesk-Medium text-base min-w-[149px] min-h-[46px] rounded-2xl text-center"
          onPress={onClose}
        >
          {action}
        </Button>
      </ModalFooter>
    </div>
  );
}

export default GlobalModalComp;