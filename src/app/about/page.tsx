"use client";

import { Button } from "@mui/material";
import P from "@/components/content/P";
import { useSnackbar } from "notistack";
import Link from "@/components/navigation/Link";

export default function Page() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Button
        onClick={() => {
          enqueueSnackbar("Success Snack :3", { variant: "success" });
        }}>
        Success
      </Button>
      <Button
        onClick={() => {
          enqueueSnackbar("Warning Snack :3", { variant: "warning" });
        }}>
        Warning
      </Button>
      <Button
        onClick={() => {
          enqueueSnackbar("Error Snack :3", { variant: "error" });
        }}>
        Error
      </Button>
      <Button
        onClick={() => {
          enqueueSnackbar("InfoSnack :3", { variant: "info" });
        }}>
        Info
      </Button>
      <Link href="/">Home</Link>&nbsp;
      <Link href="/about">About</Link>
      <P>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores ipsam
        vero quo dolores commodi hic saepe doloremque modi, voluptates
        voluptatem similique officiis corrupti enim nobis sit, expedita
        assumenda vel dolor. Voluptate similique molestias veritatis quam vero
        facere explicabo consequatur modi deserunt voluptas alias at sit animi
        voluptatum ut temporibus aperiam vel, pariatur blanditiis impedit odio?
        Vel sunt obcaecati neque aliquam. Aspernatur ducimus optio harum hic
        quam dolorem quasi voluptatem nostrum sequi? Natus, mollitia odit?
        Possimus quas ex id! Soluta consectetur deleniti ducimus nobis
        repudiandae. Ullam quae soluta autem qui eum! Dolores hic ducimus a esse
        architecto magnam quisquam ad autem. Laboriosam quibusdam commodi ipsa
        sequi ea nesciunt ipsam mollitia dolor autem asperiores libero dicta
        sunt, vero beatae obcaecati fugit quas! Ullam ex rem, in officia earum
        molestiae eos est sit impedit unde nulla optio maiores quae recusandae
        dolores mollitia rerum aliquam error eaque distinctio quos doloribus
        dolorum. Necessitatibus, adipisci cupiditate! Nulla saepe necessitatibus
        vitae facilis officiis assumenda inventore! Illum, labore sed? Odio
        cumque voluptas soluta iste expedita dolor perferendis? Quos tenetur
        harum, nihil totam alias mollitia rem nemo voluptatibus non. Voluptatem
        excepturi obcaecati eos. Eos fugit cumque possimus commodi natus
        repellat delectus cum. Voluptatem pariatur odit nihil magni ab veniam,
        voluptate expedita suscipit minus nisi accusantium repellendus
        dignissimos, ad voluptatum. Sint totam minima vitae natus modi hic
        eligendi, iure suscipit, voluptas ipsum perferendis quae dolorum officia
        nihil ut eum maxime ratione? Recusandae, harum! Qui temporibus esse eos
        debitis quisquam totam? Officiis, laudantium, quisquam nobis voluptatem
        vel sunt ipsum dolores perspiciatis consequuntur numquam blanditiis
        quos, ut autem mollitia corporis dolore? Ipsum ut reprehenderit
        necessitatibus voluptatem optio sunt accusamus magni quasi voluptates?
        Aut odit eos tempora fugiat in facilis, incidunt sit at maiores
        excepturi cupiditate reiciendis! Nostrum earum, saepe dolor consequatur
        iusto necessitatibus libero rerum expedita mollitia quas possimus cumque
        aut voluptates? Quod adipisci possimus odio veniam suscipit voluptas
        vero natus quis qui impedit commodi ex dolorum repudiandae voluptates,
        corrupti est nostrum consectetur reprehenderit asperiores porro.
        Reiciendis saepe libero dolorem fugiat explicabo. Numquam quo obcaecati
        esse impedit animi voluptas quibusdam dolorum? Tenetur illum sit
        eligendi aspernatur nulla culpa amet sunt! Voluptatibus ipsam obcaecati
        fugiat molestias odio non eligendi atque vero accusamus assumenda? Culpa
        beatae non asperiores provident laborum, molestiae consequuntur quaerat
        natus expedita! Quis omnis dignissimos repellendus deserunt beatae
        ipsum, quisquam nobis animi repudiandae labore aut reprehenderit quia,
        laboriosam eaque voluptatum voluptates. Eum eveniet explicabo quos
        voluptas officiis, sit possimus saepe magnam dolorem voluptates facilis,
        ipsum aut optio incidunt provident consectetur distinctio nihil, vel
        molestias dolores? Nesciunt in deleniti voluptatem facere dolorem.
        Reiciendis est consectetur pariatur quia sapiente iure quasi eligendi
        unde id ipsum vero mollitia ipsa maxime placeat explicabo nihil,
        officiis voluptatem earum, quo atque odit veniam ad voluptates
        cupiditate? Adipisci? Pariatur quod deserunt vel, quaerat aspernatur in
        reiciendis, ea quas, sit totam iste voluptatem repellat minima inventore
        suscipit hic dolorum maiores. Iste delectus, praesentium repellendus
        voluptatem vero eius commodi nisi. Beatae consectetur deleniti impedit
        officia officiis! Doloremque, et sequi aperiam quo harum incidunt a
        nesciunt. Vero culpa deleniti nostrum ut aspernatur sed, quam impedit
        non nemo, accusamus laudantium eius porro. Maiores velit amet
        temporibus. Est aut sit recusandae, sapiente ratione ea quae eius
        tenetur reiciendis, corporis mollitia quos dolores! Consequuntur ullam
        excepturi a voluptas iste explicabo itaque, in reprehenderit cumque.
        Aliquid magni temporibus quaerat repellendus rerum quod animi
        necessitatibus voluptas sunt! Illum eveniet vero deleniti quas sint
        minus dicta nisi est autem perspiciatis ex dolor corporis voluptas,
        debitis officia eos. Officiis suscipit aspernatur nulla amet!
        Consequuntur cupiditate saepe neque cum, commodi inventore esse quod
        beatae? Unde, voluptas, dicta cumque illo tenetur non quo corporis
        tempore suscipit deserunt accusamus nam blanditiis?
      </P>
    </>
  );
}
