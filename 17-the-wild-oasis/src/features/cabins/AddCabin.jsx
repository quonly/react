import Button from "../../ui/Button"
import CreateCabinForm from "./CreateCabinForm"
import Modal from "../../ui/Modal"
import CabinTable from "./CabinTable"

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  )
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false)

//   return (
//     <>
//       <Button onClick={() => setIsOpenModal(!isOpenModal)}>
//         {!isOpenModal ? "Add" : "Close add"} new cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(!isOpenModal)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(!isOpenModal)} />
//         </Modal>
//       )}
//     </>
//   )
// }

export default AddCabin
