import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@supabase/auth-js";

interface SignedInProps {
  signedInUser: User | null;
}

const SignedIn = ({ signedInUser }: SignedInProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="size-10">
            <AvatarImage
              src={signedInUser?.user_metadata?.avatar_url}
              alt="@shadcn"
            />
            <AvatarFallback className="bg-purple-3 text-white text-lg">
              {`${signedInUser?.user_metadata?.first_name.slice(0, 1)}${signedInUser?.user_metadata?.last_name.slice(0, 1)}`}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60 mt-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {`${signedInUser?.user_metadata?.first_name} ${signedInUser?.user_metadata?.last_name}`}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {signedInUser?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default SignedIn;
