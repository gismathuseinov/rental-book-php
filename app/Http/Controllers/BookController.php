<?php

namespace App\Http\Controllers;

use App\Http\Requests\BookEditRequest;
use App\Http\Requests\BookRequest;
use App\Models\Book;
use App\Models\BookGenre;
use App\Models\Borrow;
use App\Models\Genre;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class BookController extends Controller
{
    public function addBook(BookRequest $bookRequest): JsonResponse
    {
        ini_set('max_execution_time', 180);
        $validated = $bookRequest->validated();
        if ($bookRequest->file('cover_image')) {
            $imagePath = $bookRequest->file('cover_image');
            $imageName = $imagePath->getClientOriginalName();

            $path = $bookRequest->file('cover_image')->storeAs('uploads', $imageName, 'public');
            $cdata = Carbon::now();
            $data = DB::table('books')->insert([
                'title' => $validated['title'],
                'authors' => $validated['authors'],
                'description' => $validated['description'],
                'cover_image' => '/storage/' . $path,
                'pages' => $validated['pages'],
                'language_code' => $validated['language_code'],
                'isbn' => $validated['isbn'],
                'in_stock' => $validated['in_stock'],
                'released_at' => $validated['released_at'],
                'created_at' => $cdata,
                'updated_at' => $cdata
            ]);
            $id = DB::getPdo()->lastInsertId();;
            foreach ($validated['genres'] as $genre) {
                DB::table('book_genres')->insert([
                    'book_id' => $id,
                    'genre_id' => $genre,
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now()
                ]);
            }
            if ($data) {
                return response()->json([
                    'status' => true
                ], 201);
            } else {
                return response()->json([
                    'msg' => "Error while inserting data to database"
                ], 500);
            }
        }
    }

    public function accept(int $id, Request $request)
    {
        $requestManagedBy = Auth::id();
        $deadline = Carbon::parse($request->deadline);
        $now = Carbon::now();

        $borrow = Borrow::find($id);
        $update = $borrow->update([
            'request_managed_by' => $requestManagedBy,
            'request_processed_at' => $now,
            'deadline' => $deadline,
            'status' => 'ACCEPTED'
        ]);
        if ($update) {
            return response()->json([
                'status' => true,
            ], 200);
        } else {
            return response()->json([
                'status' => false,
            ], 500);
        }

    }

    public function reject(int $id): JsonResponse
    {
        $requestManagedBy = Auth::id();
        $borrow = Borrow::find($id);
        $borrow?->update([
            'status' => 'REJECTED',
            'request_processed_at' => $requestManagedBy
        ]);
        return response()->json([
            'status' => true
        ], 200);

    }

    public function singleBook(int $id)
    {
        $book = Book::find($id);
        $allGenres = Genre::all();
        $selectedGenres = $book->genres;
        foreach ($allGenres as $key => $allGenre) {
            foreach ($selectedGenres as $index => $selectedGenre) {
                if ($selectedGenre->id === $allGenre->id) {
                    unset($allGenres[$key]);
                }
            }
        }
        if ($book) {
            return view('dashboard.book-edit', compact(['book', 'allGenres', 'selectedGenres']));
        }
    }

    public function update(int $id, BookEditRequest $bookRequest)
    {
        $validated = $bookRequest->validated();
        $book = Book::find($id);
        if ($book) {
            if (!isset($validated['cover_image'])) {
                $coverImage = $book->cover_image;
            } else {
                $imagePath = $bookRequest->file('cover_image');
                $imageName = $imagePath->getClientOriginalName();

                $path = $bookRequest->file('cover_image')->storeAs('uploads', $imageName, 'public');
                $coverImage = '/storage/' . $path;
            }

            $cdata = Carbon::now();
            $data = DB::table('books')->where('id', $id)->update([
                'title' => $validated['title'],
                'authors' => $validated['authors'],
                'description' => $validated['description'],
                'cover_image' => $coverImage,
                'pages' => $validated['pages'],
                'language_code' => $validated['language_code'],
                'isbn' => $validated['isbn'],
                'in_stock' => $validated['in_stock'],
                'released_at' => $validated['released_at'],
                'updated_at' => $cdata
            ]);

            foreach ($validated['genres'] as $genre) {
                $delete = BookGenre::where([
                    'book_id' => $id,
                    'genre_id' => $genre
                ])->delete();
            }
            foreach ($validated['genres'] as $genre) {
                $insert = BookGenre::create([
                    'book_id' => $id,
                    'genre_id' => $genre
                ]);
            }

            if ($data) {
                return response()->json([
                    'status' => true
                ], 201);
            } else {
                return response()->json([
                    'msg' => "Error while inserting data to database"
                ], 500);
            }
        }
    }

    public function delete(int $id)
    {
        $relation = Borrow::where('book_id', $id)->where('status', '<>', 'RETURNED')->count();
        if ($relation === 0) {
            $book = DB::table('books')->where('id', $id)->delete();
            return response()->json([
                'status' => true
            ], 200);
        } else {
            return response()->json([
                'err' => 'This book is borrowed'
            ], 500);
        }
    }

    public function returnBorrow(int $id)
    {
        $borrow = Borrow::find($id);
        $returnAt = Carbon::now();
        $userId = Auth::id();
        $update = $borrow->update([
            'status' => 'RETURNED',
            'returned_at' => $returnAt,
            'return_managed_by' => $userId
        ]);
        if ($update) {
            return response()->json([
                'status' => true
            ], 200);
        } else {
            return response()->json([
                'status' => false
            ], 500);
        }
    }

}
