import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getContact, updateContact } from "../contacts";

export async function loader({ params }) {
    return getContact(params.contactId);
}

export async function action({ request, params }) {
    let formData = await request.formData();
    return updateContact(params.contactId, {
        favorite: formData.get("favorite") === "true",
    });
}

export const Contact = () => {

    const contact = useLoaderData();

    return (
        <div id="contact" className="sm:flex sm:items-start p-10">
            <div>
                <img
                    key={contact.avatar}
                    src={contact.avatar || null}
                    className='rounded-md h-40 w-max'
                />
            </div>

            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left bg-white">
                <h1 className="flex flex-row gap-10 pb-1 text-lg font-medium leading-6 text-gray-900 w-max">
                    {contact.first || contact.last ? (
                        <>
                            {contact.first} {contact.last}
                        </>
                    ) : (
                        <i>No Name</i>
                    )}{" "}
                    <Favorite contact={contact} />
                </h1>

                {contact.twitter && (
                    <p className='text-blue-500 font-medium pb-2'>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${contact.twitter}`}
                        >
                            {contact.twitter}
                        </a>
                    </p>
                )}

                {contact.notes && <p className="pb-5">{contact.notes}</p>}

                <div className="flex flex-row items-center gap-4">
                    <Form action="edit">
                        <button type="submit" className="text-blue-600 border drop-shadow-sm bg-white px-4 py-2 rounded-md">Edit</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Por favor, confirme que desea eliminar este registro."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit" className="text-red-400 bg-white border drop-shadow-sm px-4 py-2 rounded-md">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}


function Favorite({ contact }) {
    // yes, this is a `let` for later
    const fetcher = useFetcher();
    let favorite = contact.favorite;
    if (fetcher.formData) {
        favorite = fetcher.formData.get("favorite") === "true";
    }

    return (
        <fetcher.Form method="post">
            <button
                className="hover:bg-yellow-300  hover:rounded-xl px-3 py-1"
                name="favorite"
                value={favorite ? "false" : "true"}
                aria-label={
                    favorite
                        ? "Remove from favorites"
                        : "Add to favorites"
                }
            >
                {favorite ? "★" : "☆"}
            </button>
        </fetcher.Form>
    );
}
