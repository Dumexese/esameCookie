import { Box, Stack, Typography } from "@mui/joy";
import { useCurrentUser } from "../../lib/useCurrentUser";
import { useEffect, useState } from "react";
import { config } from "../../config";
import { User } from "../../../../api";
import { useFetch } from "../../lib/useFetch";

// TODO Task 2 - implementa la chiamata api per recuperare il destinatario del regalo


export const Done: React.FC = () => {
  const currentUser = useCurrentUser();

  const [recipient, setRecipient] = useState<User | null>();
  const [error, setError] = useState(Boolean);

  const fetch = useFetch();

  useEffect(() => {
    const fetchRecipient = async () => {
      const response = await fetch(`${config.API_BASEPATH}/api/recipient`);

      if (response?.ok) {
        const recipient = await response.json();
        setRecipient(recipient);
      } else {
        setError(true);
      }
  };
  fetchRecipient();
  }, []);

  if (error) {
    return "Mi dispiace, tutti i destinatari sono stati stati estratti";
  }

  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        Ciao {currentUser?.first_name} {currentUser?.last_name}
        <br />
        Hai già estratto il destinatario del tuo regalo, <br />
        si tratta di:
      </Box>
      <Box>
        <Typography level="h2" sx={{ fontSize: "2em", mt: 5 }}>
          {recipient?.first_name} {recipient?.last_name}
        </Typography>
      </Box>
    </Stack>
  );
};
