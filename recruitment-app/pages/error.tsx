import DefaultPage from '~/components/defaultPage.tsx';

export default function ErrorPage({ title, message, user }) {
    return <DefaultPage header={title} user={user}>
        <p>{message}</p>
    </DefaultPage>;
}