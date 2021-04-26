import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import EventItem from "@/components/EventItem";
import qs from "qs";

import { API_URL } from "@/config/index";

const SearchPage = ({ events }) => {
  const {
    query: { term }
  } = useRouter();
  console.log(term);
  return (
    <Layout title="Search Results">
      <Link href="/events">« Back to events</Link>
      <h1>Search results for {term}</h1>
      {events.length === 0 && <h3>Sorry, no events found under {term}.</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
    </Layout>
  );
};

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term }
      ]
    }
  });
  const res = await fetch(`${API_URL}/events?${query}`, { method: "GET" });
  const events = await res.json();
  return { props: { events } };
}

export default SearchPage;
