<?php

namespace App\Http\Controllers;

use App\Models\Book;
use App\Models\Borrow;
use App\Models\Genre;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SiteController extends Controller
{
    public function getBooks()
    {
        $books = Book::all();
        return view('books', compact('books'));
    }

    public function singleBook(int $id)
    {
        $book = Book::findOrFail($id);
        $stock = Borrow::where('book_id', $book->id)->where('status','<>','RETURNED')->count();
        return view('detail-book', compact(['book', 'stock']));
    }

    public function index()
    {
        $userCount = User::where('is_librarian', false)->count();
        $booksCount = Book::all()->count();
        $genreCount = Genre::all()->count();
        $borrows = Borrow::where('status', 'ACCEPTED')->count();
        return view('welcome', compact(['userCount', 'booksCount', 'genreCount', 'borrows']));
    }

    public function borrowBook(int $id): JsonResponse
    {
        ini_set('max_execution_time', 180);
        $readerId = Auth::id();
        $check = Borrow::where('book_id',$id)->where('reader_id',$readerId)->count();
        if($check > 0){
            return response()->json([
                'error' => "You can't take this book,because you have a request"
            ], 500);
        }
        $data = Borrow::create([
            'reader_id' => $readerId,
            'book_id' => $id,
            'status' => 'PENDING'
        ]);
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