/* import { useRouter } from 'next/router';

const SingleCampView = () => {
  const router = useRouter();
  const { campSlug } = router.query;

  return <div>Hey, you visited a camp with slug {campSlug}</div>;
};

export async function getStaticProps(context) {
  const { campSlug } = context;

  return {
    props: {}, // will be passed to the page component as props
  };
}

export default SingleCampView;
 */