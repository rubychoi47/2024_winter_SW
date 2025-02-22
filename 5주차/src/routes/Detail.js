import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail() {
    const { id } = useParams();

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);

                // 응답이 정상적인지 확인
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                // JSON 변환 전에 원본 응답을 확인
                const text = await response.text();
                console.log("Raw response:", text);

                // 응답이 비어 있으면 오류 발생
                if (!text) {
                    throw new Error("Empty response from server");
                }

                // JSON 변환
                const json = JSON.parse(text);
                console.log("Parsed JSON:", json);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        getMovies();
    }, [id]);  // id가 변경될 때마다 실행

    console.log("Movie ID:", id);

    return <h1>Detail</h1>;
}

export default Detail;