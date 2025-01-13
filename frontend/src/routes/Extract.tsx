import { Box, Stack, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { User } from "../../../api";
import { useCurrentUser } from "../lib/useCurrentUser";
import { useFetch } from "../lib/useFetch";
import { config } from "../config";

// TODO Task 1 - implementa la logica che manca: estrai il destinatario (chiamando una api) e visualizza il risultato

export const Extract: React.FC = () => {
  const currentUser = useCurrentUser();
  const [recipient, setRecipient] = useState<User | null>();
  const [error, setError] = useState(Boolean);

  const fetch = useFetch();

  useEffect(() => {
    const fetchRecipient = async () => {
      const response = await fetch(`${config.API_BASEPATH}/api/extract`, 
      {method: "POST"});

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
    return "Mi dispiace, tutti i destinatari sono stati già estratti";
  }

  if (!recipient) {
    return "Attendi mentre estraggo il destinatario....";
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
        Complimenti {currentUser?.first_name} {currentUser?.last_name}
        <br />
        il destinatario del tuo regalo di Natale sarà:
      </Box>
      <Box>
        <Typography level="h2" sx={{ fontSize: "2em", mt: 5 }}>
          {recipient?.first_name} {recipient?.last_name}
        </Typography>
      </Box>
    </Stack>
  );
};
