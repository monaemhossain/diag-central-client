import { useContext } from "react";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

const Profile = () => {
    const { user } = useContext(AuthContext);
    console.log(user);
    const { displayName, email, photoURL } = user
    return (
        <section className="py-14">
            <div className="max-w-screen-xl mx-auto md:px-8">
                <div className="items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
                    <div className="flex-1 lg:block">
                        <img src={photoURL} className="md:max-w-lg sm:rounded-lg" alt="" />
                    </div>
                    <div className="max-w-xl px-4 space-y-3 mt-6 sm:px-0 md:mt-0 lg:max-w-2xl">
                        <h3 className="text-primary font-semibold">
                            Name: {displayName}
                        </h3>
                        <p className="text-gray-800 text-2xl font-semibold sm:text-3xl">
                            Email: {email}
                        </p>

                        <Dialog.Root>
                            <Dialog.Trigger>
                                <Button className="inline-flex gap-x-1 items-center text-primary hover:text-indigo-500 duration-150 font-medium">Edit profile
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                                    </svg>
                                </Button>
                            </Dialog.Trigger>

                            <Dialog.Content style={{ maxWidth: 450 }}>
                                <Dialog.Title>Edit profile</Dialog.Title>
                                <Dialog.Description size="2" mb="4">
                                    Make changes to your profile.
                                </Dialog.Description>

                                <Flex direction="column" gap="3">
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Name
                                        </Text>
                                        <TextField.Input
                                            defaultValue={displayName}
                                            placeholder="Enter your full name"
                                        />
                                    </label>
                                    <label>
                                        <Text as="div" size="2" mb="1" weight="bold">
                                            Email
                                        </Text>
                                        <TextField.Input
                                            disabled
                                            defaultValue={email}
                                            placeholder="Enter your email"
                                        />
                                    </label>
                                </Flex>

                                <Flex gap="3" mt="4" justify="end">
                                    <Dialog.Close>
                                        <Button variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </Dialog.Close>
                                    <Dialog.Close>
                                        <Button>Save</Button>
                                    </Dialog.Close>
                                </Flex>
                            </Dialog.Content>
                        </Dialog.Root>


                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;