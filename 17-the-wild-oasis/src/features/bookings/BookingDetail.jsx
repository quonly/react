import styled from "styled-components"

import BookingDataBox from "./BookingDataBox"
import Row from "../../ui/Row"
import Heading from "../../ui/Heading"
import Tag from "../../ui/Tag"
import ButtonGroup from "../../ui/ButtonGroup"
import Button from "../../ui/Button"
import ButtonText from "../../ui/ButtonText"
import Spinner from "../../ui/Spinner"

import { useMoveBack } from "../../hooks/useMoveBack"
import { useBooking } from "./useBooking"
import { useNavigate } from "react-router-dom"
import { HiArrowUpOnSquare } from "react-icons/hi2"
import { useCheckout } from "../check-in-out/useCheckout"
import { useDeleteBooking } from "./useDeleteBooking"
import Modal from "../../ui/Modal"
import ConfirmDelete from "../../ui/ConfirmDelete"

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`

function BookingDetail() {
  const { booking, isLoading } = useBooking()

  const navigate = useNavigate()
  const moveBack = useMoveBack()
  const { checkout, isCheckout } = useCheckout()
  const { isDeleting, deleteBooking } = useDeleteBooking()

  if (isLoading || isDeleting) return <Spinner />

  const { status, id: bookingId } = booking

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  }

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
          Check in
        </Button>
        {status === "checked-in" && (
          <Button
            icon={<HiArrowUpOnSquare />}
            onClick={() => checkout(bookingId)}
            disabled={isCheckout}
          >
            Check out
          </Button>
        )}
        <Modal>
          <Modal.Open opens="delete">
            <Button
              $variation="danger"
              onClick={() => deleteBooking(bookingId)}
            >
              Delete
            </Button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="booking"
              disabled={isDeleting}
              onConfirm={() => {
                deleteBooking(bookingId, { onSettled: () => moveBack() })
              }}
            />
          </Modal.Window>
        </Modal>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default BookingDetail
